module.exports = {
  type: 'confirm',
  name: 'value', // Always use value
  message: 'Use a custom rnb-plugin', // Will be override
  onRender(kleur) {
    this.msg = kleur.green(`📲 Do you want to use a custom rnb plugin ? ${kleur.gray('(y/N)')} \n\n`)
  },
  initial: false,
}
