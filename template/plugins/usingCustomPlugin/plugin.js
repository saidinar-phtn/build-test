const process = require('process')
const prompts = require('prompts')
const { execSync } = require('child_process')
const { green, blue } = require('kleur')
const promptsOptions = require('./_prompts')
const ttys = require('ttys');

module.exports = {
  async apply(value, previousValues) {
    if (value) {
      let x = ''

      // let counter = 0
      // const customPluginPrompt = {
      //   type: 'text',
      //   name: 'path',
      //   message: 'Use a custom rnb-plugin',
      //   onRender(kleur) {
      //     counter++
      //     if (counter === 1) {
      //       this.msg = ''
      //     }
      //     console.log(
      //       '\033[1D',
      //       kleur.green(`Enter the name of you package : ${kleur.gray('<organisation>/<package_name>')}`),
      //       x
      //     )
      //   },
      //   initial: false,
      // }
      console.log(
        '\033[1D',
        kleur.green(`Enter the name of you package : ${kleur.gray('<organisation>/<package_name>')}`),
        x
      )

      process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
          process.exit();
        } else {
          x = `${x}${str}`
          console.log(
            '\033[1D',
            kleur.green(`Enter the name of you package : ${kleur.gray('<organisation>/<package_name>')}`),
            x
          )
        }
      });


      const { path } = await prompts(customPluginPrompt)

      await execSync(
        `yarn add -D ${path}`,
        { stdio: 'pipe' },
      );

      const {name, promptsOptions, apply} = await require(path)


      console.log('coucou', name, promptsOptions)
      if (!promptsOptions) {
        await apply(null, previousValues)
        return { [name]: null, ...previousValues }
      }
      const { value } = await prompts(promptsOptions)
      await apply(value, previousValues)
      return { [name]: value, ...previousValues }

    }
    return Promise.resolve()
  },
}
