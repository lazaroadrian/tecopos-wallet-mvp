// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.

/**
 * Unit tests for createOperationSchema — M4 field validation rules.
 *
 * These are pure zod schema tests: no React, no RN, no mocks.
 * Each test maps to one normative validation scenario from the spec.
 */
import { createOperationSchema } from '../createOperationSchema';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns a Date representing today at midnight (not in the future). */
function today(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Returns a Date representing tomorrow at midnight (in the future). */
function tomorrow(): Date {
  const d = today();
  d.setDate(d.getDate() + 1);
  return d;
}

/** Returns a Date representing yesterday. */
function yesterday(): Date {
  const d = today();
  d.setDate(d.getDate() - 1);
  return d;
}

/** Valid base input used as the starting point for each test. */
function validInput() {
  return {
    amount: '100',
    type: 'income' as const,
    date: today(),
    description: 'test description',
  };
}

// ---------------------------------------------------------------------------
// amount — required
// ---------------------------------------------------------------------------

describe('createOperationSchema — amount', () => {
  it('fails when amount is empty string', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), amount: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const amountError = result.error.issues.find((i) => i.path[0] === 'amount');
      expect(amountError).toBeDefined();
    }
  });

  it('fails when amount is whitespace only', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), amount: '   ' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const amountError = result.error.issues.find((i) => i.path[0] === 'amount');
      expect(amountError).toBeDefined();
    }
  });

  it('fails when amount is a non-numeric string', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), amount: 'abc' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const amountError = result.error.issues.find((i) => i.path[0] === 'amount');
      expect(amountError).toBeDefined();
    }
  });

  it('fails when amount is zero', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), amount: '0' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const amountError = result.error.issues.find(
        (i) => i.path[0] === 'amount' && i.message.includes('greater than 0')
      );
      expect(amountError).toBeDefined();
    }
  });

  it('fails when amount is negative', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), amount: '-5' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const amountError = result.error.issues.find(
        (i) => i.path[0] === 'amount' && i.message.includes('greater than 0')
      );
      expect(amountError).toBeDefined();
    }
  });

  it('fails when amount exceeds maximum (999,999,999.99)', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), amount: '1000000000' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const amountError = result.error.issues.find((i) => i.path[0] === 'amount');
      expect(amountError).toBeDefined();
    }
  });

  it('fails when amount has more than 2 decimal places', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), amount: '10.999' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const amountError = result.error.issues.find(
        (i) => i.path[0] === 'amount' && i.message.includes('2 decimal')
      );
      expect(amountError).toBeDefined();
    }
  });

  it('passes with a valid integer amount', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), amount: '100' });
    expect(result.success).toBe(true);
  });

  it('passes with 2 decimal places', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), amount: '10.99' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.amount).toBe(10.99);
    }
  });

  it('passes with amount = 999,999,999.99 (boundary)', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), amount: '999999999.99' });
    expect(result.success).toBe(true);
  });

  it('trims whitespace around a valid numeric string', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), amount: '  42  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.amount).toBe(42);
    }
  });
});

// ---------------------------------------------------------------------------
// type — required, enum
// ---------------------------------------------------------------------------

describe('createOperationSchema — type', () => {
  it('fails when type is missing', () => {
    const input = { ...validInput() };
    // @ts-expect-error intentional invalid value
    input.type = undefined;
    const result = createOperationSchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      const typeError = result.error.issues.find((i) => i.path[0] === 'type');
      expect(typeError).toBeDefined();
    }
  });

  it('fails when type is an invalid string', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), type: 'debit' as 'income' });
    expect(result.success).toBe(false);
  });

  it('passes with type = income', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), type: 'income' });
    expect(result.success).toBe(true);
  });

  it('passes with type = expense', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), type: 'expense' });
    expect(result.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// date — required, valid, not future
// ---------------------------------------------------------------------------

describe('createOperationSchema — date', () => {
  it('fails when date is a future date', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), date: tomorrow() });
    expect(result.success).toBe(false);
    if (!result.success) {
      const dateError = result.error.issues.find(
        (i) => i.path[0] === 'date' && i.message.includes('future')
      );
      expect(dateError).toBeDefined();
    }
  });

  it('passes when date is today', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), date: today() });
    expect(result.success).toBe(true);
  });

  it('passes when date is yesterday', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), date: yesterday() });
    expect(result.success).toBe(true);
  });

  it('defaults to today on form open (defaultValues contract)', () => {
    // The schema itself does not set defaults; this verifies that today passes.
    const d = new Date();
    d.setHours(12, 0, 0, 0); // noon today — still today
    const result = createOperationSchema.safeParse({ ...validInput(), date: d });
    expect(result.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// description — required, min 1 after trim, max 200 after trim
// ---------------------------------------------------------------------------

describe('createOperationSchema — description', () => {
  it('fails when description is empty string', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), description: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const descError = result.error.issues.find((i) => i.path[0] === 'description');
      expect(descError).toBeDefined();
    }
  });

  it('fails when description is only whitespace (empty after trim)', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), description: '   ' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const descError = result.error.issues.find(
        (i) => i.path[0] === 'description'
      );
      expect(descError).toBeDefined();
    }
  });

  it('fails when description exceeds 200 characters after trim', () => {
    const longDesc = 'a'.repeat(201);
    const result = createOperationSchema.safeParse({ ...validInput(), description: longDesc });
    expect(result.success).toBe(false);
    if (!result.success) {
      const descError = result.error.issues.find(
        (i) => i.path[0] === 'description' && i.message.includes('200')
      );
      expect(descError).toBeDefined();
    }
  });

  it('passes with description exactly 200 characters', () => {
    const exactDesc = 'a'.repeat(200);
    const result = createOperationSchema.safeParse({ ...validInput(), description: exactDesc });
    expect(result.success).toBe(true);
  });

  it('trims leading/trailing whitespace and the trimmed value is stored', () => {
    const result = createOperationSchema.safeParse({
      ...validInput(),
      description: '  groceries  ',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.description).toBe('groceries');
    }
  });

  it('passes with a minimal 1-character description', () => {
    const result = createOperationSchema.safeParse({ ...validInput(), description: 'x' });
    expect(result.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Happy path — full valid input
// ---------------------------------------------------------------------------

describe('createOperationSchema — happy path', () => {
  it('parses a fully valid expense operation', () => {
    const result = createOperationSchema.safeParse({
      amount: '42.50',
      type: 'expense',
      date: today(),
      description: 'Lunch',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.amount).toBe(42.5);
      expect(result.data.type).toBe('expense');
      expect(result.data.description).toBe('Lunch');
    }
  });

  it('parses a fully valid income operation with trimmed description', () => {
    const result = createOperationSchema.safeParse({
      amount: '1000',
      type: 'income',
      date: today(),
      description: '  salary  ',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.description).toBe('salary');
    }
  });
});
