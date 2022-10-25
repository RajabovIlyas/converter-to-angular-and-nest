interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  const newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    return opts.default;
  }

  if (Number.isFinite(opts.min) && newValue < opts.min) {
    return opts.min;
  }

  if (Number.isFinite(opts.max) && newValue > opts.max) {
    return opts.max;
  }

  return newValue;
}
