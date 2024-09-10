async function register() {
  let id = document.querySelector("#userIDinput").value;
  let pw = document.querySelector("#userPWinput").value;

  // var bodyJSON = {
  //   title: titleText,
  //   content: contentText
  // };
  // const response = await fetch('/writepost', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json; charset=utf-8'
  //   },
  //   body: JSON.stringify(bodyJSON)
  // });
  // const idWrap = await response.json();
  // window.location.href = "/viewpost?postid=" + idWrap.id;
  alert("All Good!");
  window.location.href = "/";
}
