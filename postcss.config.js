module.exports = {
  plugins: [
  	require('autoprefixer'),
  	noRunningDev(require('cssnano'))
 	]
}

function noRunningDev(cb){
	return process.env.NODE_ENV ==! 'dev' ? cb : null
}