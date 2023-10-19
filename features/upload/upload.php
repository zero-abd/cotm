<?php
	$image = $_FILES['myfile'];
	$title = $_POST['title'];
	$slug = $_POST['slug'];
	$desc = $_POST['desc'];
	move_uploaded_file($image['tmp_name'], '../image/'.$slug.'.jpg');
	$json = file_get_contents('../feature.json');
	$data = json_decode($json, true);
	$data[] = array(
		'id' => $slug,
		'name' => $title,
		'image' => $slug.'.jpg',
		'description' => $desc
	);
	$json = json_encode($data,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
	file_put_contents('../feature.json', $json);
	echo '<script>alert("Feature Added Successfully!");window.location.href = "../"</script>';
	?>