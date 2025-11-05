import calcPoints from "./calcPoints";
import { useTranslation } from '@/components/useTranslations';

export default function EndBanner({
  countryStreaksEnabled,
  singlePlayerRound,
  onboarding,
  countryGuesser,
  countryGuesserCorrect,
  options,
  lostCountryStreak,
  session,
  guessed,
  latLong,
  pinPoint,
  countryStreak,
  fullReset,
  km,
  multiplayerState,
  usedHint,
  toggleMap,
  panoShown,
  setExplanationModalShown
}) {
  const { t: text } = useTranslation("common");

  return (
    <div id='endBanner' style={{ display: guessed ? '' : 'none' }}>
      <button
        className="openInMaps topGameInfoButton"
        onClick={() => {
          toggleMap();
        }}
      >
        {panoShown ? "Mostrar mapa" : "Mostrar panorama"}
      </button>

      <div className="bannerContent">
        {pinPoint && (km >= 0) ? (
          <span className='mainBannerTxt'>
            Seu palpite ficou a {km.toFixed(1)} km de distância!
          </span>
        ) : (
          <span className='mainBannerTxt'>
            {countryGuesser
              ? (countryGuesserCorrect
                ? "País correto!"
                : "País incorreto!")
              : "Você não fez um palpite!"}
          </span>
        )}

        <p className="motivation">
          {latLong && pinPoint && (onboarding || multiplayerState?.inGame) &&
            `Você ganhou ${calcPoints({
              lat: latLong.lat,
              lon: latLong.long,
              guessLat: pinPoint.lat,
              guessLon: pinPoint.lng,
              usedHint: false,
              maxDist: multiplayerState?.gameData?.maxDist ?? 20000
            })} pontos!`
          }

          {countryGuesser && onboarding && latLong && "Você ganhou 2500 pontos!"}
        </p>

        {countryStreaksEnabled && (
          <p className="motivation">
            {countryStreak > 0 && `Você está em uma sequência de ${countryStreak} países!`}
            {lostCountryStreak > 0 && `Você perdeu uma sequência de ${lostCountryStreak} países!`}
          </p>
        )}

        <p className="motivation">
          {singlePlayerRound && `Você ganhou ${singlePlayerRound.lastPoint} pontos!`}
        </p>
      </div>

      {!multiplayerState && (
        <div className="endButtonContainer">
          <button className="playAgain" onClick={fullReset}>
            {(onboarding && onboarding.round === 5)
              || (singlePlayerRound && singlePlayerRound.round === singlePlayerRound.totalRounds)
              ? "Ver resultados" : "Próxima rodada"}
          </button>

          {session?.token?.canMakeClues && (
            <button
              className="openInMaps"
              onClick={() => {
                if (!panoShown) toggleMap();
                setExplanationModalShown(true);
              }}
            >
              Escrever explicação
            </button>
          )}
        </div>
      )}
    </div>
  );
}
