/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
theme: {
	extend: {
		colors: {
			'custom-purple': '#fbf6ff',
			'table-purple': '#431D5A',
			white: '#fff',
			gray: {
				'100': '#8a8a8a',
				'200': '#858585',
				'300': '#23272b',
				'400': '#262628',
				'500': '#1c1c1e',
				'600': '#181818',
				'700': 'rgba(255, 255, 255, 0.4)',
				'800': 'rgba(0, 0, 0, 0.5)',
				'900': 'rgba(38, 38, 40, 0.78)',
				'1000': 'rgba(0, 0, 0, 0.3)',
				'1100': 'rgba(0, 0, 0, 0.4)',
				'1200': 'rgba(0, 0, 0, 0.2)',
				'1300': 'rgba(0, 0, 0, 0.56)',
				'1400': 'rgba(28, 28, 30, 0.75)'
			},
			darkslateblue: '#431d5a',
			dimgray: '#666',
			ghostwhite: {
				'100': '#fbf7ff',
				'200': '#fbf6ff'
			},
			thistle: {
				'100': '#c7bbcd',
				'200': '#c1afce'
			},
			black: '#000',
			lightgray: '#d1d1d1',
			mediumseagreen: '#47bb76',
			gainsboro: {
				'100': '#ddd',
				'200': '#d9d9d9'
			},
			darkgray: '#aaa',
			whitesmoke: {
				'100': '#f9f9f9',
				'200': '#f2f2f2'
			},
			darkslategray: {
				'100': '#343434',
				'200': '#313030',
				'300': '#263238'
			},
			slategray: '#57647c',
			crimson: '#ed3237',
			silver: '#b8b8b8',
			midnightblue: '#4b176b',
			blueviolet: '#9747ff',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		spacing: {},
		fontFamily: {
			montserrat: 'Montserrat',
			'montserrat-alternates': 'Montserrat Alternates',
			inherit: 'inherit'
		},
		borderRadius: {
			'custom-lg': '1.75rem',
			'8xs': '5px',
			'5xs-4': '7.4px',
			'11xl-9': '30.9px',
			'2xs': '11px',
			'2xl': '21px',
			mini: '15px',
			'81xl': '100px',
			'6xl-4': '25.4px',
			'6xs': '7px',
			'23xl': '42px',
			'4xl': '23px',
			'7xs-9': '5.9px',
			lgi: '19px',
			'62xl-3': '81.3px',
			'base-2': '16.2px',
			smi: '13px',
			sm: 'calc(var(--radius) - 4px)',
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)'
		}
	},
	fontSize: {
		xl: '20px',
		base: '16px',
		'base-1': '16.1px',
		lg: '18px',
		'5xl': '24px',
		lgi: '19px',
		'smi-1': '12.1px',
		'12xl-7': '31.7px',
		'6xl': '25px',
		'13xl': '32px',
		'7xl': '26px',
		'23xl': '42px',
		'15xl': '34px',
		sm: '14px',
		'17xl': '36px',
		'3xl': '22px',
		'10xl': '29px',
		'base-5': '15.5px',
		'3xl-4': '22.4px',
		'mini-8': '14.8px',
		'3xl-2': '22.2px',
		'21xl': '40px',
		'2xl-2': '21.2px',
		mid: '17px',
		'15xl-8': '34.8px',
		'lgi-5': '19.5px',
		'26xl': '45px',
		'8xl': '27px',
		'31xl': '50px',
		'11xl': '30px',
		'16xl': '35px',
		'9xl': '28px',
		'2xl': '21px',
		'36xl': '55px',
		'25xl': '44px',
		'14xl': '33px',
		'xl-7': '20.7px',
		'5xl-1': '24.1px',
		inherit: 'inherit'
	},
	screens: {
		mq1275: {
			raw: 'screen and (max-width: 1275px)'
		},
		mq1250: {
			raw: 'screen and (max-width: 1250px)'
		},
		lg: {
			max: '1200px'
		},
		mq1100: {
			raw: 'screen and (max-width: 1100px)'
		},
		mq1050: {
			raw: 'screen and (max-width: 1050px)'
		},
		mq750: {
			raw: 'screen and (max-width: 750px)'
		},
		mq450: {
			raw: 'screen and (max-width: 450px)'
		}
	}
},
  plugins: [require("tailwindcss-animate")],
}
