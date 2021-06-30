/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class MusicsService {
  constructor() {
    this._musics = [];
  }

  addMusic({
    title, year, performer, genre, duration,
  }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newMusic = {
      id, title, year, performer, genre, duration, insertedAt, updatedAt,
    };

    this._musics.push(newMusic);

    const isSuccess = this._musics.filter((music) => music.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return id;
  }

  getMusics() {
    return this._musics;
  }

  getMusicById(id) {
    const music = this._musics.filter((n) => n.id === id)[0];
    if (!music) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
    return music;
  }

  editMusicById(id, {
    title, year, performer, genre, duration,
  }) {
    const index = this._musics.findIndex((music) => music.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._musics[index] = {
      ...this._musics[index],
      title,
      year,
      performer,
      genre,
      duration,
      updatedAt,
    };
  }

  deleteMusicById(id) {
    const index = this._musics.findIndex((music) => music.id === id);
    if (index === -1) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
    this._musics.splice(index, 1);
  }
}

module.exports = MusicsService;
