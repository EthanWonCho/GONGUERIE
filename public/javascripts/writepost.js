async function postSubmit() {
  var titleText = document.querySelector("#postTitleInput").value;
  var contentText = document.querySelector("#postContentInput").value;
  var bodyJSON = {
    title: titleText,
    content: contentText
  };
  const response = await fetch('/writepost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(bodyJSON)
  });
  const idWrap = await response.json();
  window.location.href = "/viewpost?postid=" + idWrap.id;
}
