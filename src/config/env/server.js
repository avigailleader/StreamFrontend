const isDev = window.location.href.includes('dev.')

module.exports = {
    BASE_URL: "https://stream.vlogger.codes/",
    CHAT_URL: isDev ? 'https://chat.dev.leader.codes/' : 'https://chat.leader.codes/',
    FILE_URL: isDev ? 'https://dev.files.codes/api/' : 'https://files.codes/api/'


}
