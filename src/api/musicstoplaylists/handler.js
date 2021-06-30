/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class MusicstoplaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postMusicstoplaylistHandler = this.postMusicstoplaylistHandler.bind(this);
    this.getMusicstoplaylistHandler = this.getMusicstoplaylistHandler.bind(this);
    this.deleteMusicstoplaylistByIdHandler = this.deleteMusicstoplaylistByIdHandler.bind(this);
  }

  async postMusicstoplaylistHandler(request, h) {
    try {
      this._validator.validateMusicstoplaylistPayload(request.payload);
      const {
        songId,
      } = request.payload;
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyPlaylistAccess(playlistId, credentialId);
      await this._service.addMusicstoplaylist({
        playlistId, songId,
      });

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getMusicstoplaylistHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { playlistId } = request.params;

      await this._service.verifyPlaylistAccess(playlistId, credentialId);
      const songs = await this._service.getMusicstoplaylists(credentialId);
      return {
        status: 'success',
        data: {
          songs: songs.rows
            .map((music) => ({
              id: music.id,
              title: music.title,
              performer: music.performer,
            })),
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deleteMusicstoplaylistByIdHandler(request, h) {
    try {
      const {
        songId,
      } = request.payload;
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyPlaylistAccess(playlistId, credentialId);
      await this._service.deleteMusicstoplaylistById(
        playlistId, songId,
      );

      return {
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = MusicstoplaylistsHandler;
