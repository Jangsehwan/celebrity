$(document).ready(function () {
    showStar();
});

function showStar() {
    $.ajax({
        type: 'GET',
        url: '/api/list?sample_give=샘플데이터',
        data: {},
        success: function (response) {
            let celebrities = response['celebrities']
            for (let i = 0; i < celebrities.length; i++) {
                let name = celebrities[i]['name']
                let img_url = celebrities[i]['img_url']
                let recent = celebrities[i]['recent']
                let url = celebrities[i]['url']
                let like = celebrities[i]['like']

                let html_temp = `
                                     <div class="card">
                                            <div class="card-content">
                                                <div class="media">
                                                    <div class="media-left">
                                                        <figure class="image is-48x48">
                                                            <img
                                                                    src="${img_url}"
                                                                    alt="Placeholder image"
                                                            />
                                                        </figure>
                                                    </div>
                                                    <div class="media-content">
                                                        <a href="${url}" target="_blank" class="star-name title is-4">${name} (좋아요: ${like})</a>
                                                        <p class="subtitle is-6">${recent}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <footer class="card-footer">
                                                <a href="#" onclick="likeStar('${name}')" class="card-footer-item has-text-info">
                                                    위로!
                                                    <span class="icon">
                                                        <i class="fas fa-thumbs-up"></i>
                                                    </span>
                                                </a>
                                                <a href="#" onclick="deleteStar('${name}')" class="card-footer-item has-text-danger">
                                                    삭제
                                                    <span class="icon">
                                          <i class="fas fa-ban"></i>
                                        </span>
                                                </a>
                                            </footer>
                                        </div>
                                     </div>
                            `

                $('#star-box').append(html_temp)
            }

        }
    });
}

function likeStar(name) {
    $.ajax({
        type: 'POST',
        url: '/api/like',
        data: {name_give: name},
        success: function (response) {
            alert(response['msg']);
            window.location.reload();
        }
    });
}

function deleteStar(name) {
    $.ajax({
        type: 'POST',
        url: '/api/delete',
        data: {name_give: name},
        success: function (response) {
            alert(response['msg']);
            window.location.reload();
        }
    });
}
