import { ApplicationError } from '@/protocols';

export function hotelsError(): ApplicationError {
  return {
    name: 'HotelsError',
    message: 'Cannot list hotels!',
  };
}
