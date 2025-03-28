declare global {
 interface Window {
  webkitSpeechRecognition: {
   continuous: boolean
   interimResults: boolean
   lang: string
  }
 }
}

window.webkitSpeechRecognition = window.webkitSpeechRecognition