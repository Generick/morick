<div id="submit_info"></div>
<?php if(isset($submit_info)): ?>
<script type="text/javascript">
<?php if(isset($submit_info['object_value'])): foreach($submit_info['object_value'] as $object => $value): ?>
$('#<?php echo $object; ?>').val('<?php echo $value; ?>');
<?php endforeach; endif; ?>
show_dialog('<?php echo $submit_info['title']; ?>');
</script>
<?php endif; ?>
</body>
</html>