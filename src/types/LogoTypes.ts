/**
 * Tipos para el componente Logo
 */

/**
 * Propiedades para el componente Logo
 */
export type LogoProps = {
    whereUse: 'login' | 'navbar' | 'register';
};

/**
 * Tipo para las dimensiones del logo según dónde se use
 */
export type DimensionsType = {
    [K in LogoProps['whereUse']]: {
        width: number;
        height: number;
    };
};