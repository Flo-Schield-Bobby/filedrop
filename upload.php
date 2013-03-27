<?php

// Please be carreful, this page is just a UGGLY CODED page for the demonstration
// You should NEVER use this kind of home-made PHP on a production server
// Adapt it properly with the framework that you used to use

$uploadedFiles = $_FILES['files'];
$uploadDir = 'public/uploads/'; // Choose your upload directory
$files = array();
$errors = array();
$status = 400;
$response = array();

if (count($uploadedFiles) > 0) {
	foreach ($uploadedFiles['name'] as $indice => $uploadedFile) {
		if ($uploadedFiles['error'][$indice] === UPLOAD_ERR_OK) {
			// Manage the file if you want with some PHP method:
			// if (move_uploaded_file($uploadedFiles['tmp_name'][$indice], "$uploads_dir/$uploadedFile")) {
				$files[] = array(
					'name' => $uploadedFile,
					'tmp_name' => $uploadedFiles['tmp_name'][$indice],
					'size' => $uploadedFiles['size'][$indice],
					'type' => $uploadedFiles['type'][$indice],
					'error' => $uploadedFiles['error'][$indice]
				);
			// } else {
				// $errors[$uploadedFile] = 'This file could not be uploaded: '.$uploadedFile;
			// }
		} else {
			$errors[$uploadedFile] = 'This file has some errors: '.$uploadedFile.'. --> UPLOAD_ERR_CODE: ['.$uploadedFiles['error'][$indice].']';
		}
	}
	if (count($errors) > 0) {
		$response = $errors;
		$status = 400;
	} else {
		$response = $files;
		$status = 200; // HTTP Status OK --> will fire the success callback of $.ajax();
	}
} else {
	$errors['Request'] = 'No file received.';
	$response = $errors;
	$status = 400; // HTTP Status Bad Request --> will fire the error callback of $.ajax();
}

echo json_encode($response);
exit($status);