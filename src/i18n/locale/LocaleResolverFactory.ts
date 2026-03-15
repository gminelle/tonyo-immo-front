import { Provider } from 'plume-ts-di';
import { LocaleResolver } from '@lib/locale-resolver/LocaleResolver';
import LocaleService from './LocaleService';

/**
 * Configure {@link LocaleResolver} pour la détection de la langue de l'application
 */
export default class LocaleResolverFactory implements Provider<LocaleResolver> {
  private readonly localeResolver: LocaleResolver;

  constructor() {
    this.localeResolver = new LocaleResolver({
      fallbackLocale: LocaleService.LOCALE_FR,
      availableLocales: [
        LocaleService.LOCALE_FR,
        LocaleService.LOCALE_EN,
        LocaleService.LOCALE_NL,
      ],
      localeStorage: window.localStorage,
      resolvers: [LocaleResolver.tryResolveFromStorage, LocaleResolver.tryResolveFromBrowser],
    });
  }

  get(): LocaleResolver {
    return this.localeResolver;
  }
}
