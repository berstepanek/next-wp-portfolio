<?php
declare(strict_types=1);

defined('ABSPATH') || exit;

// Allège le <head> et les assets inutiles en headless.
$blank_theme_removals = [
    ['wp_head', 'print_emoji_detection_script', 7],
    ['admin_print_scripts', 'print_emoji_detection_script', 10],
    ['wp_print_styles', 'print_emoji_styles', 10],
    ['admin_print_styles', 'print_emoji_styles', 10],
    ['wp_head', 'wp_generator', 10],
    ['wp_head', 'rsd_link', 10],
    ['wp_head', 'wlwmanifest_link', 10],
    ['wp_head', 'wp_shortlink_wp_head', 10],
    ['wp_head', 'wp_oembed_add_discovery_links', 10],
];

foreach ($blank_theme_removals as [$hook, $callback, $priority]) {
    remove_action($hook, $callback, $priority);
}

unset($blank_theme_removals);

// Pas de commentaires.
add_action('init', static function (): void {
    foreach (get_post_types() as $type) {
        if (post_type_supports($type, 'comments')) {
            remove_post_type_support($type, 'comments');
            remove_post_type_support($type, 'trackbacks');
        }
    }
}, 100);

add_filter('comments_open', '__return_false', 20);
add_filter('pings_open', '__return_false', 20);
add_action('admin_menu', static function (): void {
    remove_menu_page('edit-comments.php');
});
