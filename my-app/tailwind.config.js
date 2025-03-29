/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            // Custom colors
            colors: {
                'michas': '#1e40af',
                'michas-light': '#3b82f6',
                'michas-dark': '#1e3a8a',
            },
            // Custom spacing (affects margin, padding, width, height, etc.)
            spacing: {
                '128': '32rem',  // 512px
                '144': '36rem',  // 576px
                'xs': '0.125rem', // 2px
                'sm-plus': '0.625rem', // 10px
            },
            // Custom width specific values
            width: {
                '1/7': '14.2857143%',
                '2/7': '28.5714286%',
                '3/7': '42.8571429%',
                '4/7': '57.1428571%',
                '5/7': '71.4285714%',
                '6/7': '85.7142857%',
                'special': '45.5%',
            },
            // Custom height specific values
            height: {
                '128': '32rem',
                'almost-screen': '90vh',
            },
            // Custom font sizes
            fontSize: {
                'xxs': '0.625rem',  // 10px
                'mega': '4rem',     // 64px
                'super': '5rem',    // 80px
            },
            // Custom border radius
            borderRadius: {
                'xl': '1rem',       // 16px
                '2xl': '2rem',      // 32px
                'special': '0.625rem', // 10px
            },
            // Custom max-width values
            maxWidth: {
                '8xl': '90rem',     // 1440px
                '9xl': '100rem',    // 1600px
                'special': '68.75rem', // 1100px
            },
        },
    },
    plugins: [],
}
