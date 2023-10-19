<!DOCTYPE html>
<html>
<head>
	<title>Upload Feature</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
	<link rel="stylesheet" href="style.css">
	<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css'>
</head>
<body>
	<form action="upload.php" method="post" enctype="multipart/form-data">
		<div class="image-input mb">
			<input type="file" accept="image/jpeg" name='myfile' id="imageInput" required>
			<center>
				<label for="imageInput" class="image-button"><i class="far fa-image"></i> Choose Banner</label>
				<img src="" class="image-preview">
				<span class="change-image">Choose a different banner</span>
			</center>
		</div>
		
		<center><label for="title" class="customlabel">Feature Title</label></center>
		<center><input type="text" name="title" placeholder="Feature Title (e.g: Eid নাTok)" class="inptext mb" required></center>

		<center><label for="slug" class="customlabel">URL Slug</label></center>
		<center><input type="text" name="slug" placeholder="URL Slug (e.g: eid-natok)" class="inptext mb" oninput="this.value=this.value.replace(/\s+/g, '-').replace(/[&~`!@#$%^*+=/;|]/g, '').toLowerCase();" required></center>

		<center><label for="description" class="customlabel">Feature Description</label></center>
		<center><textarea name="desc" placeholder="Feature Description (Give necessary line breaks & indentation)" class="inptextarea mb" required></textarea></center>


		<center><input type="submit" value="Add Feature" id="submitbtn"></center>
		<br>
	</form>

	<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>
	<script>
		$('#imageInput').on('change', function() {
			$input = $(this);
			if($input.val().length > 0) {
				fileReader = new FileReader();
				fileReader.onload = function (data) {
				$('.image-preview').attr('src', data.target.result);
				}
				fileReader.readAsDataURL($input.prop('files')[0]);
				$('.image-button').css('display', 'none');
				$('.image-preview').css('display', 'block');
				$('.change-image').css('display', 'block');
			}
		});
								
		$('.change-image').on('click', function() {
			$control = $(this);			
			$('#imageInput').val('');	
			$preview = $('.image-preview');
			$preview.attr('src', '');
			$preview.css('display', 'none');
			$control.css('display', 'none');
			$('.image-button').css('display', 'block');
		});

	</script>
</body>
</html>

  