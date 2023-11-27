<?php
/**
 * Plugin Name:       Bloque Categorias Colores
 * Description:       AMX Job Rosas
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Job Rosas
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bloque-categorias-colores
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function bloque_categorias_colores_bloque_categorias_colores_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'bloque_categorias_colores_bloque_categorias_colores_block_init' );
