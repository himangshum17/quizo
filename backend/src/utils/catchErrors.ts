import { AsyncController } from "../types/globalTypes";

/**
 * Higher-order function to catch errors in asynchronous controller functions.
 *
 * @param controller - An asynchronous controller function that handles Express request, response, and next middleware.
 * @returns A new asynchronous controller function that wraps the original controller with error handling.
 *
 * @example
 * // Usage in an Express route:
 * const myController: AsyncController = async (req, res, next) => {
 *   const data = await someAsyncOperation();
 *   res.json(data);
 * };
 *
 * app.get('/route', catchErrors(myController));
 */

const catchErrors =
  (controller: AsyncController): AsyncController =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export { catchErrors };
