async function deletePost(postid) {
  const response = await fetch('/viewpost?postid='+postid, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
  });
  if(response.status == 200)
    window.location.href = "/announcements";
}
