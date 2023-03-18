import { useEffect, useState } from 'react'

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const jasonValue = localStorage.getItem(key);

        if (jasonValue !== null) return JSON.parse(jasonValue);

        if (typeof defaultValue === 'function') {
            return defaultValue()
        } else {
            return defaultValue
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue];
}
