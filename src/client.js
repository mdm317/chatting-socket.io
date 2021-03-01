function startClient() {
  function findGetParameter(parameterName) {
    var result = null,
      tmp = [];
    location.search
      .substr(1)
      .split('&')
      .forEach(function (item) {
        tmp = item.split('=');
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }
  const room = findGetParameter('room');
  console.log(room);
  var socket = io({ query: { room } });
  console.log('start server');
  var form = document.getElementById('form');
  var input = document.getElementById('input');
  var messages = document.querySelector('#messages');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('send message', input.value);
      var item = document.createElement('li');
      item.textContent = input.value;
      item.className = 'my-message';
      messages.appendChild(item);
      input.value = '';
    }
  });
  socket.on('receive message', function (msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
  });
}
startClient();
