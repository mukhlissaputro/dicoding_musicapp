const MusicstoplaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'musicstoplaylists',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const musicstoplaylistsHandler = new MusicstoplaylistsHandler(service, validator);
    server.route(routes(musicstoplaylistsHandler));
  },
};
