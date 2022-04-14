const process = require('process')
const prompts = require('prompts')
const { execSync } = require('child_process')
const { green, gray } = require('kleur')
const readline = require('readline');

module.exports = {
  async apply(value, previousValues) {
    if (value) {
      let path = ''

      process.stdin.on('keypress', (str, key) => {
        if (key.ctrl && key.name === 'c') {
          process.exit();
        } else if (key.name === 'backspace' ) {
          path = path.substring(0, path.length - 1);
          console.log(
            '\033[40D',
            '\033[2A',
            '\033[K',
            `${green(`Enter the name of you package : `)} ${path}`,
            '\033[1B',
          )
        } else {
          path = `${path}${str}`
          console.log(
            '\033[40D',
            '\033[2A',
            '\033[K',
            `${green(`Enter the name of you package : `)} ${path}`,
            '\033[1B',
          )
        }
      });

      console.log(
        green(` Enter the name of you package : ${gray('<organisation>/<package_name>')}`),
        '\n'
      )

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      await new Promise((resolve, reject) => {
        rl.question('', (answer) => {
          path = answer
          rl.close()
          resolve()
        })

        rl.on('close', function () {
          console.log('\nBYE BYE !!!');
        });
      })

      await execSync(
        `yarn add -D ${path}`,
        { stdio: 'pipe' },
      );

      const {name, promptsOptions, apply} = await require(path)

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
