var manageDrop = function (files, dropEvent, UploaderInstance) {
		var i,
			$uploadedFiles = $('#uploaded-files'),
			$uploadedFilesHeader = $('#uploaded-files-header'),
			data;
		if (window.FormData) {
			data = new FormData();
			for (i = 0; i < files.length; i++) {
				data.append('files[]', files[i]);
			}
			$.ajax({
				'url': 'upload.php',
				'type': 'post',
				'processData': false,
				'contentType': false,
				'cache': false,
				'async': true,
				'data': data,
				'dataType': 'json'
			}).success(function (response) {
				var $filename,
					$filetype,
					$filesize,
					$item;
				$uploadedFilesHeader.show();
				for (i = 0; i < response.length; i++) {
					$filename = $('<span/>', {
						'class': 'filename'
					}).text(response[i].name);
					$filetype = $('<span/>', {
						'class': 'filetype'
					}).text(response[i].type);
					$filesize = $('<span/>', {
						'class': 'filesize'
					}).text(response[i].size + ' b');
					$item = $('<li/>', {
						'class': 'uploaded-file'
					}).append($filename).append($filetype).append($filesize).appendTo($uploadedFiles);
				}
			}).fail(function (response) {
				if (console && console.log) {
					console.log(response);
				}
				alert('Oh, something is going wrong, please check your JavaScript console !');
			});
		} else {
			alert('Votre navigateur ne supporte pas l\'API FormData [HTML5]');
		}
	},
	App = new FileDropper(document.getElementById('drop-area'), manageDrop);

prettyPrint();