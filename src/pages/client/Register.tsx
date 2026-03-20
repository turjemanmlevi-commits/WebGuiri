import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, CheckCircle2, XCircle, MapPin, Map } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { validateTaxId, validateEmail, validatePhone } from '../../utils/validators';

// ─── Google Maps types (minimal) ─────────────────────────────────────────────
declare global {
  interface Window {
    googleMapsLoaded: boolean;
    initGoogleMaps: () => void;
    google: any;
  }
}

// ─── Validation field state ───────────────────────────────────────────────────
type FieldState = 'idle' | 'valid' | 'invalid';

interface FieldStatus {
  state: FieldState;
  message?: string;
  hint?: string;
}

function ValidationIcon({ state }: { state: FieldState }) {
  if (state === 'valid') return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  if (state === 'invalid') return <XCircle className="w-4 h-4 text-red-500" />;
  return null;
}

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Form fields
  const [company, setCompany] = useState('');
  const [cif, setCif] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  // Validation states
  const [cifStatus, setCifStatus] = useState<FieldStatus>({ state: 'idle' });
  const [emailStatus, setEmailStatus] = useState<FieldStatus>({ state: 'idle' });
  const [phoneStatus, setPhoneStatus] = useState<FieldStatus>({ state: 'idle' });

  // Google Maps
  const [mapsReady, setMapsReady] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const autocompleteRef = useRef<any>(null);

  // ─── Wait for Google Maps to load ──────────────────────────────────────────
  useEffect(() => {
    if (window.googleMapsLoaded) {
      setMapsReady(true);
      return;
    }
    const handler = () => setMapsReady(true);
    window.addEventListener('googlemapsloaded', handler);
    return () => window.removeEventListener('googlemapsloaded', handler);
  }, []);

  // ─── Init Google Places Autocomplete ───────────────────────────────────────
  useEffect(() => {
    if (!mapsReady || !addressInputRef.current) return;

    const google = window.google;
    autocompleteRef.current = new google.maps.places.Autocomplete(addressInputRef.current, {
      types: ['address'],
      fields: ['formatted_address', 'geometry'],
    });

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setAddress(place.formatted_address);
      }
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCoordinates({ lat, lng });
        setShowMap(true);
      }
    });
  }, [mapsReady]);

  // ─── Init/update map when coordinates change ────────────────────────────────
  const initMap = useCallback((lat: number, lng: number) => {
    if (!mapContainerRef.current || !window.google) return;
    const google = window.google;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapContainerRef.current, {
        center: { lat, lng },
        zoom: 16,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
    } else {
      mapInstanceRef.current.setCenter({ lat, lng });
    }

    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    markerRef.current = new google.maps.Marker({
      position: { lat, lng },
      map: mapInstanceRef.current,
      draggable: true,
      title: 'Arrastra para ajustar la ubicación',
    });

    markerRef.current.addListener('dragend', (e: any) => {
      const newLat = e.latLng.lat();
      const newLng = e.latLng.lng();
      setCoordinates({ lat: newLat, lng: newLng });

      // Reverse geocode to update address field
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results: any[], status: string) => {
        if (status === 'OK' && results[0]) {
          setAddress(results[0].formatted_address);
          if (addressInputRef.current) {
            addressInputRef.current.value = results[0].formatted_address;
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    if (showMap && coordinates) {
      // Small delay to ensure the container is rendered
      setTimeout(() => initMap(coordinates.lat, coordinates.lng), 100);
    }
  }, [showMap, coordinates, initMap]);

  // ─── Validators ────────────────────────────────────────────────────────────
  const handleCifBlur = () => {
    if (!cif.trim()) { setCifStatus({ state: 'idle' }); return; }
    const result = validateTaxId(cif);
    setCifStatus({
      state: result.valid ? 'valid' : 'invalid',
      message: result.valid ? `${result.type} válido` : result.error,
    });
  };

  const handleEmailBlur = () => {
    if (!email.trim()) { setEmailStatus({ state: 'idle' }); return; }
    const result = validateEmail(email);
    setEmailStatus({
      state: result.valid ? 'valid' : 'invalid',
      message: result.valid ? 'Email válido' : result.error,
    });
  };

  const handlePhoneBlur = () => {
    if (!phone.trim()) { setPhoneStatus({ state: 'idle' }); return; }
    const result = validatePhone(phone);
    setPhoneStatus({
      state: result.valid ? 'valid' : 'invalid',
      message: result.valid ? `Teléfono válido · ${result.formatted}` : result.error,
      hint: result.formatted,
    });
    if (result.valid && result.formatted) {
      setPhone(result.formatted);
    }
  };

  const handlePinOnMap = () => {
    if (!mapsReady) return;
    // Default to Spain center if no address selected
    const defaultCoords = coordinates || { lat: 40.4168, lng: -3.7038 };
    setCoordinates(defaultCoords);
    setShowMap(true);
  };

  const canSubmit =
    company.trim() &&
    cifStatus.state === 'valid' &&
    emailStatus.state === 'valid' &&
    phoneStatus.state === 'valid' &&
    contact.trim() &&
    address.trim() &&
    password.length >= 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    navigate('/catalog');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-primary-50 flex items-center justify-center p-4 py-12">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-lg animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-surface-900 mb-2">{t('auth.registerTitle')}</h1>
          <p className="text-surface-500">{t('auth.registerSubtitle')}</p>
        </div>

        {/* Form */}
        <div className="card p-8 shadow-glass">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Company + CIF */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label">{t('auth.companyName')} *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Mi Empresa S.L."
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                />
              </div>
              <div>
                <label className="input-label flex items-center justify-between">
                  <span>{t('auth.cif')} *</span>
                  {cifStatus.state !== 'idle' && (
                    <span className={`text-xs font-normal ${cifStatus.state === 'valid' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {cifStatus.message}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className={`input-field pr-8 ${
                      cifStatus.state === 'valid' ? 'border-emerald-400 focus:border-emerald-500' :
                      cifStatus.state === 'invalid' ? 'border-red-400 focus:border-red-500' : ''
                    }`}
                    placeholder="B12345678"
                    value={cif}
                    onChange={e => setCif(e.target.value.toUpperCase())}
                    onBlur={handleCifBlur}
                    maxLength={9}
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                    <ValidationIcon state={cifStatus.state} />
                  </div>
                </div>
                {cifStatus.state === 'idle' && (
                  <p className="text-xs text-surface-400 mt-1">CIF, NIF o NIE</p>
                )}
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label flex items-center justify-between">
                  <span>{t('auth.email')} *</span>
                  {emailStatus.state !== 'idle' && (
                    <span className={`text-xs font-normal ${emailStatus.state === 'valid' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {emailStatus.state === 'valid' ? '✓' : emailStatus.message}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className={`input-field pr-8 ${
                      emailStatus.state === 'valid' ? 'border-emerald-400 focus:border-emerald-500' :
                      emailStatus.state === 'invalid' ? 'border-red-400 focus:border-red-500' : ''
                    }`}
                    placeholder="contacto@empresa.es"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                    <ValidationIcon state={emailStatus.state} />
                  </div>
                </div>
                {emailStatus.state === 'invalid' && (
                  <p className="text-xs text-red-500 mt-1">{emailStatus.message}</p>
                )}
              </div>
              <div>
                <label className="input-label flex items-center justify-between">
                  <span>{t('auth.phone')} *</span>
                  {phoneStatus.state !== 'idle' && (
                    <span className={`text-xs font-normal ${phoneStatus.state === 'valid' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {phoneStatus.state === 'valid' ? '✓' : ''}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    className={`input-field pr-8 ${
                      phoneStatus.state === 'valid' ? 'border-emerald-400 focus:border-emerald-500' :
                      phoneStatus.state === 'invalid' ? 'border-red-400 focus:border-red-500' : ''
                    }`}
                    placeholder="+34 612 345 678"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    onBlur={handlePhoneBlur}
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                    <ValidationIcon state={phoneStatus.state} />
                  </div>
                </div>
                {phoneStatus.state === 'invalid' && (
                  <p className="text-xs text-red-500 mt-1">{phoneStatus.message}</p>
                )}
                {phoneStatus.state === 'valid' && phoneStatus.hint && (
                  <p className="text-xs text-emerald-600 mt-1">{phoneStatus.hint}</p>
                )}
              </div>
            </div>

            {/* Contact person */}
            <div>
              <label className="input-label">{t('auth.contactPerson')} *</label>
              <input
                type="text"
                className="input-field"
                placeholder="Nombre Apellido"
                value={contact}
                onChange={e => setContact(e.target.value)}
              />
            </div>

            {/* Delivery address with Google Maps */}
            <div>
              <label className="input-label flex items-center justify-between">
                <span>{t('auth.deliveryAddress')} *</span>
                {mapsReady && (
                  <button
                    type="button"
                    onClick={handlePinOnMap}
                    className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <Map className="w-3 h-3" />
                    Marcar en mapa
                  </button>
                )}
                {!mapsReady && (
                  <span className="text-xs text-surface-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Añade tu API Key de Google Maps
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  ref={addressInputRef}
                  type="text"
                  className="input-field pr-8"
                  placeholder="Calle, número, código postal, ciudad"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
                {coordinates && (
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                    <MapPin className="w-4 h-4 text-primary-500" />
                  </div>
                )}
              </div>
              {mapsReady && !showMap && (
                <p className="text-xs text-surface-400 mt-1">
                  Escribe la dirección para ver sugerencias o pulsa "Marcar en mapa"
                </p>
              )}

              {/* Map container */}
              {showMap && (
                <div className="mt-3 rounded-xl overflow-hidden border border-surface-200 shadow-sm">
                  <div ref={mapContainerRef} className="w-full h-52" />
                  <div className="px-3 py-2 bg-surface-50 border-t border-surface-100 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                    <p className="text-xs text-surface-500">
                      Arrastra el pin para ajustar la ubicación exacta
                    </p>
                  </div>
                  {coordinates && (
                    <div className="px-3 py-1.5 bg-emerald-50 border-t border-emerald-100">
                      <p className="text-xs text-emerald-700 font-mono">
                        {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="input-label">{t('auth.password')} *</label>
              <input
                type="password"
                className={`input-field ${
                  password.length > 0 && password.length < 8 ? 'border-amber-400' :
                  password.length >= 8 ? 'border-emerald-400' : ''
                }`}
                placeholder="Mín. 8 caracteres, 1 mayúscula, 1 número"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {password.length > 0 && (
                <div className="mt-1.5 flex gap-1">
                  {['≥8 char', 'Mayúscula', 'Número'].map((req, i) => {
                    const checks = [
                      password.length >= 8,
                      /[A-Z]/.test(password),
                      /\d/.test(password),
                    ];
                    return (
                      <span
                        key={req}
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          checks[i] ? 'bg-emerald-100 text-emerald-700' : 'bg-surface-100 text-surface-400'
                        }`}
                      >
                        {req}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`btn-primary w-full mt-2 ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {t('auth.register')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-surface-100 text-center">
            <p className="text-sm text-surface-500">
              {t('auth.hasAccount')}{' '}
              <Link to="/" className="text-primary-600 hover:text-primary-700 font-semibold">{t('auth.login')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
