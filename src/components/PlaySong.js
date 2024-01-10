import axios from 'axios';

const PlaySong = (uri, href) => {
  axios({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    url: 'https://api.spotify.com/v1/me/player/devices',
  })
    .then(resp => {
      let index = 0;
      while (resp.data.devices[index]) {
        if (
          resp.data.devices[index].is_active &&
          !resp.data.devices[index].is_restricted
        ) {
          return resp.data.devices[index].id;
        }
        index++;
      }
      if (typeof resp.data.devices[0] !== 'undefined') {
        return resp.data.devices[0].id;
      }
      throw Error('Cannot find an available device to play on.');
    })

    .then(device => {
      axios({
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        url: 'https://api.spotify.com/v1/me/player/play',
        method: 'PUT',
        params: {
          device_id: device,
        },
        data: {
          uris: [uri],
        },
      }).catch(err => {
        console.log(err);
        if (!err.response.status) return;
        let errorStatus = err.response.status;
        if (errorStatus === 400) {
        }
      });
    })
    .catch(err => {
      console.log(href);
      window.open(href, '_blank');
    });
};

export default PlaySong;
