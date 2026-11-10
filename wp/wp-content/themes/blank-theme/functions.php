<?php
declare(strict_types=1);

defined('ABSPATH') || exit;

const BLANK_THEME_DIR = __DIR__;

require_once __DIR__ . '/inc/post-types.php';
require_once __DIR__ . '/inc/scf.php';
require_once __DIR__ . '/inc/headless.php';
require_once __DIR__ . '/inc/cleanup.php';

add_action('after_setup_theme', static function (): void {
    add_theme_support('post-thumbnails');

    register_nav_menus([
        'primary' => __('Menu principal', 'blank-theme'),
    ]);
});

add_action('graphql_register_types', static function (): void {
    register_graphql_field('RootQuery', 'globalStylesheet', [
        'type'    => 'String',
        'resolve' => static function (): string {
            return wp_get_global_stylesheet();
        },
    ]);
});

// Régénère les permaliens à l'activation du thème (pour les CPT).
add_action('after_switch_theme', static function (): void {
    flush_rewrite_rules();
});
