import { describe, it, expect, vi } from 'vitest';
import type { NextFunction, Request, Response } from 'express';
import { errorHandler } from './error-handler.js';

function makeRes() {
  const json = vi.fn();
  const status = vi.fn(() => ({ json }));
  return { res: { status } as unknown as Response, status, json };
}

describe('errorHandler', () => {
  it('responds with 500 and the error message', () => {
    const { res, status, json } = makeRes();
    const next = vi.fn() as unknown as NextFunction;

    errorHandler(new Error('boom'), {} as Request, res, next);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ error: 'boom' });
  });

  it('falls back to a generic message for non-Error values', () => {
    const { res, json } = makeRes();
    const next = vi.fn() as unknown as NextFunction;

    errorHandler('not-an-error', {} as Request, res, next);

    expect(json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
