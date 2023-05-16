import chalk from 'chalk'


function logResult(result, expectation, message) {
  if (result == expectation) {
    console.log(chalk.green(message))
  } else {
    console.log(chalk.red(message))
  }
}


export {
  logResult,
}