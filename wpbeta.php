<?php
/*
Plugin Name:wpbeta
Description: Plugin para crear un  bloque en Gutenberg
Author: nadiaprd
Author URI: 
Version: 0.0.1
*/


function functionBack() {
	 
	wp_enqueue_script(
	    'bloqueBETA',
	    plugin_dir_url(__FILE__) . '/js/wpbeta.js',
	    array('wp-blocks', 'wp-i18n', 'wp-editor'),
	    true
	);


	 wp_enqueue_style(
		'editor', 
		plugins_url( 'css/editor.css', __FILE__ ), // css interno para el editor.
		array(),
		'4.7.0'
	);


}

add_action('enqueue_block_editor_assets', 'functionBack');


function funtionsFront() {
    
    wp_enqueue_style(
		'fontawesome', 
		plugins_url( 'css/font-awesome/css/font-awesome.min.css', __FILE__ ), // iconos font-awesome
		array(),
		'4.7.0'
	);

	wp_enqueue_style(
		'front-css', 
		plugins_url( 'css/front.css', __FILE__ ), // iconos font-awesome
		array(),
		'1.0.0'
	);
    


}    
 
add_action('init', 'funtionsFront');
 



