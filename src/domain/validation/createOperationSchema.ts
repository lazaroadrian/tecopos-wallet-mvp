// AI-ASSISTED: generated with Claude (Gentle AI / SDD). Reviewed by <author>.
import { z } from 'zod';

/**
 * Zod schema for the Create-Operation form (M4 — full field validation rules).
 *
 * Normative rules enforced:
 *
 * amount:
 *  - REQUIRED: coerce from string; empty/whitespace → NaN → fails numeric check.
 *  - NUMERIC: z.coerce.number() rejects non-numeric strings.
 *  - > 0: .positive() rejects zero and negatives.
 *  - ≤ 999,999,999.99: .max() rejects over-limit values.
 *  - MAX 2 DECIMAL PLACES: custom refine — `(v * 100) % 1 === 0`.
 *  - Whitespace stripped before coercion by the preprocessing step.
 *
 * type:
 *  - REQUIRED: z.enum(['income', 'expense']) rejects missing / other values.
 *
 * date:
 *  - REQUIRED: z.date() rejects undefined/null.
 *  - VALID CALENDAR DATE: z.date() only accepts Date objects (not strings that
 *    would silently become NaN). Date pickers always produce a valid Date.
 *  - NOT IN THE FUTURE: custom refine compares against midnight of today.
 *    Using startOfTomorrow avoids same-day edge cases caused by exact time.
 *
 * description:
 *  - REQUIRED: .min(1) on the TRIMMED string rejects empty-after-trim.
 *  - ≤ 200 CHARS after trim: .max(200) applied after trimming.
 *  - TRIMMED: z.string().trim() strips leading/trailing whitespace before
 *    validation and before the value is used at submit time.
 */

/** Maximum allowed amount per spec (M4). */
export const AMOUNT_MAX = 999_999_999.99;

/** Returns true if the value has at most 2 decimal places. */
function atMostTwoDecimals(value: number): boolean {
  // Multiply by 100 and check for fractional remainder.
  // Use toFixed to avoid floating-point noise (e.g. 10.999).
  return Number((value * 100).toFixed(10)) % 1 === 0;
}

/** Computes the start of tomorrow as a Date (used for future-date guard). */
function startOfTomorrow(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  return d;
}

export const createOperationSchema = z.object({
  /**
   * Amount: coerce from string (TextInput), strip surrounding whitespace first,
   * then apply numeric + range + precision rules.
   */
  amount: z
    .preprocess(
      (val) => (typeof val === 'string' ? val.trim() : val),
      z
        .coerce
        .number({ invalid_type_error: 'Amount must be a number', required_error: 'Amount is required' })
        .positive('Amount must be greater than 0')
        .max(AMOUNT_MAX, `Amount must be at most ${AMOUNT_MAX.toLocaleString()}`)
        .refine(atMostTwoDecimals, {
          message: 'Amount must have at most 2 decimal places',
        })
    ),

  /** Type: must be exactly 'income' or 'expense'. */
  type: z.enum(['income', 'expense'], {
    required_error: 'Type is required',
    invalid_type_error: 'Type must be income or expense',
  }),

  /**
   * Date: must be a valid Date object and must not be in the future.
   * The date picker always returns a Date, so we validate the object type first,
   * then check it is before tomorrow's midnight.
   */
  date: z
    .date({ required_error: 'Date is required', invalid_type_error: 'Date is required' })
    .refine((d) => d < startOfTomorrow(), {
      message: 'Date cannot be in the future',
    }),

  /**
   * Description: trim whitespace, then validate length.
   * .trim() mutates the output value — the trimmed string is what gets submitted.
   */
  description: z
    .string({ required_error: 'Description is required' })
    .trim()
    .min(1, 'Description is required')
    .max(200, 'Description must be at most 200 characters'),
});

export type CreateOperationFormValues = z.infer<typeof createOperationSchema>;
