<?php
declare(strict_types=1);

defined('ABSPATH') || exit;

/*
 * À définir de préférence dans wp-config.php :
 *   define('HEADLESS_FRONTEND_URL', 'https://mon-site.com');
 *   define('HEADLESS_PREVIEW_SECRET', 'une-cle-secrete');
 */
defined('HEADLESS_FRONTEND_URL') || define('HEADLESS_FRONTEND_URL', 'http://localhost:3000');

/**
 * Redirige tout le front WordPress vers Next.js.
 * L'admin, /graphql, l'API REST, AJAX et cron ne sont pas touchés.
 */
add_action('template_redirect', static function (): void {
    $skip = is_admin()
        || wp_doing_ajax()
        || wp_doing_cron()
        || (defined('REST_REQUEST') && REST_REQUEST)
        || (function_exists('is_graphql_http_request') && is_graphql_http_request());

    if ($skip) {
        return;
    }

    $path = $_SERVER['REQUEST_URI'] ?? '/';
    wp_redirect(untrailingslashit(HEADLESS_FRONTEND_URL) . $path, 302);
    exit;
});

/**
 * Bouton « Prévisualiser » → route de preview Next.js (Draft Mode).
 * Actif seulement si HEADLESS_PREVIEW_SECRET est défini.
 */
add_filter('preview_post_link', static function (string $link, WP_Post $post): string {
    if (!defined('HEADLESS_PREVIEW_SECRET')) {
        return $link;
    }

    return add_query_arg([
        'secret' => HEADLESS_PREVIEW_SECRET,
        'id'     => $post->ID,
        'type'   => $post->post_type,
    ], untrailingslashit(HEADLESS_FRONTEND_URL) . '/api/preview');
}, 10, 2);
