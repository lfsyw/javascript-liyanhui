<?php
	require 'config.php';
	
	$query = mysql_query("SELECT title,content,date FROM blog_blog ORDER BY date DESC LIMIT 0,3") or die('SQL错误！');
	
	$json = '';
	
	while (!!$row = mysql_fetch_array($query, MYSQL_ASSOC)) {
		$json .= json_encode($row).',';
	}
	
	//sleep(2);
	echo '['.substr($json, 0 , strlen($json) - 1).']';

	mysql_close();
?>