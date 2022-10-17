import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		fallbackLng: 'es',
		resources: {
			es: {
				translation: {
					common: {
						loading: "Cargando . . .",
						error: "Error",
						success: "Éxito",
						goBack: "Volver",
						remove: "Quitar",
						fetching: "Obteniendo . . .",
						roles: {
							player: "Jugador",
							staff: "Asistente",
							coach: "Entrenador"
						},
						unauthorized: {
							unauthorized: "No Autorizado",
							noAccess: "No tienes acceso para la pagina solcitada."
						}
					},
					home: {
						trainingDay: "Día del entrenamiento",
						numberOfPlayersTraining: "Número de jugadores para el entrenamiento"
					},
					login: {
						signIn: "Inicia sesión",
						username: "Nombre de usuario",
						password: "Contraseña",
						needAccount: "¿No tienes cuenta?",
						signUp: "Apúntate",
					},
					missing: {
						pageNotFound: "Página no encontrada",
						visitHomePage: "Visita nuestra home",
						oops: "Oops!",
					},
					register: {
						register: "Regístrate",
						email: "Email",
						usernameNote: "4 a 24 caracteres. <br /> Debe empezar con una letra. <br />Están permitidos: letras, números y guiones.",
						emailNote: "Debe ser un email válido",
						passwordNote: "8 to 24 caracteres. <br /> Debe incluir: letras mayúsculas y minúsculas, un número y un caracter especial. <br />Caracteres permitidos: !  @  #  $  %",
						confirmPassword: "Confirma la contraseña",
						mustMatch: "Las contraseñas deben coincidir",
						dropdownDefaultValue: "Participación en el club",
						registered: "¿Ya tienes una cuenta?"
					}
				}
			},
			// ------------------------- INGLES ----------------------------- //
			en: {
				translation: {
					common: {
						loading: "Loading . . .",
						error: "Error",
						success: "Success",
						goBack: "Go Back",
						remove: "Remove",
						fetching: "Fetching . . .",
						roles: {
							player: "Player",
							staff: "Staff",
							coach: "Coach"
						},
						unauthorized: {
							unauthorized: "Unauthorized",
							noAccess: "You do not have access to the requested page."
						}
					},
					home: {
						trainingDay: "Training day",
						numberOfPlayersTraining: "Number of players for the training"
					},
					login: {
						signIn: "Sign in",
						username: "Username",
						password: "Password",
						needAccount: "Need an account?",
						signUp: "Sign up"
					},
					missing: {
						pageNotFound: "Page not found",
						visitHomePage: "Visit our Homepage",
						oops: "Oops!",
					},
					register: {
						register: "Register",
						email: "Email",
						usernameNote: "4 a 24 characters. <br /> Must begin with a letter. <br />Letter, numbers, underscores, hyphens allowed.",
						emailNote: "Must be email format",
						passwordNote: "8 to 24 characters. <br /> Must include uppercase and lowercase letters, a number and a special character. <br />Allowed special characters: !  @  #  $  %",
						confirmPassword: "Confirma the password",
						mustMatch: "Passwords must match",
						dropdownDefaultValue: "Role in the club",
						registered: "Already have an account?"
					}
				}
			}
		}
	})