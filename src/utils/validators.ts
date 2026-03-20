// ─── CIF / NIF / NIE Validation ──────────────────────────────────────────────

function validateCIF(cif: string): boolean {
  const cleaned = cif.toUpperCase().replace(/\s/g, '');
  if (!/^[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J]$/.test(cleaned)) return false;

  const type = cleaned[0];
  const body = cleaned.substring(1, 8);
  const control = cleaned[8];

  let sumOdd = 0;
  let sumEven = 0;

  for (let i = 0; i < 7; i++) {
    const digit = parseInt(body[i]);
    if (i % 2 === 0) {
      // odd position (1,3,5,7 one-indexed)
      let n = digit * 2;
      if (n > 9) n -= 9;
      sumOdd += n;
    } else {
      // even position (2,4,6 one-indexed)
      sumEven += digit;
    }
  }

  const total = sumOdd + sumEven;
  const controlDigit = (10 - (total % 10)) % 10;
  const controlLetter = 'JABCDEFGHI'[controlDigit];

  if ('PQSW'.includes(type)) return control === controlLetter;
  if ('ABEH'.includes(type)) return control === String(controlDigit);
  return control === String(controlDigit) || control === controlLetter;
}

function validateNIF(nif: string): boolean {
  const cleaned = nif.toUpperCase().replace(/\s/g, '');
  const LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';

  // DNI: 8 digits + letter
  if (/^\d{8}[A-Z]$/.test(cleaned)) {
    const num = parseInt(cleaned.substring(0, 8));
    return cleaned[8] === LETTERS[num % 23];
  }

  // NIE: X, Y, Z + 7 digits + letter
  if (/^[XYZ]\d{7}[A-Z]$/.test(cleaned)) {
    const prefixMap: Record<string, string> = { X: '0', Y: '1', Z: '2' };
    const num = parseInt(prefixMap[cleaned[0]] + cleaned.substring(1, 8));
    return cleaned[8] === LETTERS[num % 23];
  }

  return false;
}

export function validateTaxId(value: string): { valid: boolean; type?: string; error?: string } {
  const cleaned = value.toUpperCase().replace(/\s/g, '');
  if (!cleaned) return { valid: false, error: 'El CIF/NIF es obligatorio' };
  if (cleaned.length < 9) return { valid: false, error: 'Mínimo 9 caracteres (ej: B12345678 o 12345678A)' };

  if (validateCIF(cleaned)) return { valid: true, type: 'CIF' };
  if (validateNIF(cleaned)) return { valid: true, type: 'NIF/NIE' };

  return { valid: false, error: 'CIF/NIF inválido — verifica el dígito de control' };
}

// ─── Email Validation ─────────────────────────────────────────────────────────

const DISPOSABLE_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwam.com',
  'yopmail.com', 'fakeinbox.com', 'trashmail.com', 'maildrop.cc',
  '10minutemail.com', 'sharklasers.com', 'guerrillamailblock.com',
];

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return { valid: false, error: 'El email es obligatorio' };

  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return { valid: false, error: 'Formato de email inválido' };

  const domain = trimmed.split('@')[1];
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    return { valid: false, error: 'No se permiten emails temporales o desechables' };
  }

  // Check for common domain typos
  const commonDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com'];
  const typos: Record<string, string> = {
    'gmial.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gmai.com': 'gmail.com',
    'hotmai.com': 'hotmail.com', 'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com',
  };
  if (typos[domain]) {
    return { valid: false, error: `¿Quisiste decir ${trimmed.split('@')[0]}@${typos[domain]}?` };
  }

  // Warn about uncommon TLDs (not block, just note)
  const tld = domain.split('.').pop() || '';
  if (tld.length === 1) return { valid: false, error: 'Dominio de email inválido' };

  return { valid: true };
}

// ─── Phone Validation ─────────────────────────────────────────────────────────

export function validatePhone(phone: string): { valid: boolean; formatted?: string; error?: string } {
  const cleaned = phone.replace(/[\s\-\.\(\)]/g, '');
  if (!cleaned) return { valid: false, error: 'El teléfono es obligatorio' };

  // Spanish number with or without +34 / 0034
  const spanishMatch = cleaned.match(/^(\+34|0034)?([6-9]\d{8})$/);
  if (spanishMatch) {
    const number = spanishMatch[2];
    return {
      valid: true,
      formatted: `+34 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`,
    };
  }

  // International E.164: + followed by 7-15 digits
  if (/^\+[1-9]\d{6,14}$/.test(cleaned)) {
    return { valid: true, formatted: cleaned };
  }

  return {
    valid: false,
    error: 'Teléfono inválido. Ej: +34 612 345 678 o 612 345 678',
  };
}
