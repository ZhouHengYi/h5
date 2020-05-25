import Vue from 'vue';
import config from '@/config/key';

(async function () {

    /******* vconsole *******/
    if (['local', 'development', 'test'].includes(process.env.domain || '')) {
        const vconsole = await import('vconsole');
        new vconsole.default();
    }

    /******* sentry *******/
    if (config.sentry) {
        const sentry = await import('@sentry/browser');
        const integrations = await import('@sentry/integrations');
        sentry.init({
            dsn: config.sentry,
            integrations: [new integrations.Vue({ Vue, attachProps: true })],
        });
    }
}())