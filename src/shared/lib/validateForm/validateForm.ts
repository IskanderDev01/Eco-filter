export const validatePhone = (_: any, value: string) => {
    const trimmedValue = value.replace(/\s+/g, '');
    if (!/^\d{9}$/.test(trimmedValue)) {
        return Promise.reject(
            new Error(
                'Телефон должен содержать только 9 цифр без пробелов',
            ),
        );
    }
    return Promise.resolve();
};