export function formatErrorMessage(error: any): string {
  try {
    let errorObj = error;

    if (error instanceof Error && typeof error.message === 'string') {
      try {
        errorObj = JSON.parse(error.message);
      } catch {
        return error.message;
      }
    }

    if (errorObj?.errors) {
      const firstKey = Object.keys(errorObj.errors)[0];
      if (
        firstKey &&
        Array.isArray(errorObj.errors[firstKey]?.errors) &&
        errorObj.errors[firstKey].errors.length > 0
      ) {
        return errorObj.errors[firstKey].errors[0];
      }
    }

    const firstKey = Object.keys(errorObj)[0];
    if (
      firstKey &&
      Array.isArray(errorObj[firstKey]?.errors) &&
      errorObj[firstKey].errors.length > 0
    ) {
      return errorObj[firstKey].errors[0];
    }

    if (errorObj?.mensagem) {
      return errorObj.mensagem;
    }

  } catch (e) {
    console.error("Erro ao formatar mensagem:", e);
  }

  return 'Erro desconhecido';
}
