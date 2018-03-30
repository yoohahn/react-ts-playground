module.exports = () => {
  const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
  return require(`./webpack.${env}.js`);
}
