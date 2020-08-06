import AuthController from './Controller/Auth/AuthController.mjs'

const apiRouter = app => {
    app.route('/api/v1/register')
        .get(AuthController.index)
        .post(AuthController.store);

    app.route('/api/v1/login')
        .get(AuthController.index)
        .post(AuthController.store);
}

export default apiRouter;