module.exports = (options, app) => {
  return (ctx, next) => {
    ctx.state.data = ctx.request.body.post;
    
    return next();
  }
}