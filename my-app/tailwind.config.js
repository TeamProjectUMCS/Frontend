/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
            },
            // Custom colors
            colors: {
                'michas': '#1e40af',
                'michas-light': '#3b82f6',
                'michas-dark': '#1e3a8a',
                'dark': '#1e0000',

                // 700 is default
                'primary': {
                    '50': '#fdf5fe',
                    '100': '#fbeafd',
                    '200': '#f6d5f9',
                    '300': '#f1b4f3',
                    '400': '#ea86ec',
                    '500': '#db58dd',
                    '600': '#c138c1',
                    '700': '#a92ea6',
                    '800': '#83257f',
                    '900': '#6b2467',
                    '950': '#460c42',
                },
                // 500 is default
                'secondary': {
                    '50': '#faf6fe',
                    '100': '#f4ebfc',
                    '200': '#eadafa',
                    '300': '#dabdf5',
                    '400': '#c492ee',
                    '500': '#b476e6',
                    '600': '#9849d4',
                    '700': '#8237b9',
                    '800': '#6d3198',
                    '900': '#59297a',
                    '950': '#3d1259',
                },
                // 500 is default
                'tertiary': {
                    '50': '#faf5fa',
                    '100': '#f6edf5',
                    '200': '#eedcec',
                    '300': '#e1c0dc',
                    '400': '#ce98c5',
                    '500': '#bf7eb2',
                    '600': '#a65c94',
                    '700': '#8d497a',
                    '800': '#763e66',
                    '900': '#643757',
                    '950': '#3b1c31',
                },
                'background': '#2a2b2a',
                // 900 is the default
                'neutral': {
                    '50': '#f6f6f6',
                    '100': '#e7e7e7',
                    '200': '#d1d1d1',
                    '300': '#b0b0b0',
                    '400': '#888888',
                    '500': '#6d6d6d',
                    '600': '#5d5d5d',
                    '700': '#4f4f4f',
                    '800': '#454545',
                    '900': '#383838',
                    '950': '#262626',
                },
                // 700 is the default
                'error': {
                    '50': '#fdf4f3',
                    '100': '#fce6e4',
                    '200': '#fbd0cd',
                    '300': '#f7b0aa',
                    '400': '#f18178',
                    '500': '#e6584d',
                    '600': '#d23c30',
                    '700': '#ad2e24',
                    '800': '#922a22',
                    '900': '#7a2822',
                    '950': '#42110d',
                },




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
            // Custom font sizesz
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
            flex: {
                '0.6': '0.6',
            },
        },
    },
    plugins: [],
}
