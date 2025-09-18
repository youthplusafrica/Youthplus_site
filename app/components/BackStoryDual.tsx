"use client";

type Source = { label: string };

export default function BackStoryDual() {
  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto max-w-8xl px-6 py-12">
        {/* <h2 className="text-2xl md:text-3xl font-bold">
          Youth unemployment: context
        </h2> */}

        {/* Global */}
        <article className="w-full">
          <h3 className="text-xl md:text-2xl font-semibold">
            <span className="text-[var(--yplus-primary,#ead61f)]">YOUTH UNEMPLOYMENT</span>: A GLOBAL PERSPECTIVE
          </h3>
          <p className="mt-3 text-white/90">
            Youth unemployment and inactivity remain elevated worldwide, with
            COVID-19 reversing progress on youth NEET(Not in Education,
            Employment or Training) rates.
          </p>

          <ul className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3 text-white/90">
            <li className="rounded-xl border border-white/15 p-4">
              <span className="block text-3xl font-extrabold text-[var(--yplus-primary,#ead61f)]">
                732M
              </span>
              <span className="block">
                youth were out of the labour force in 2021.
              </span>
            </li>
            <li className="rounded-xl border border-white/15 p-4">
              <span className="block text-3xl font-extrabold text-[var(--yplus-primary,#ead61f)]">
                75M
              </span>
              <span className="block">youth were unemployed in 2021.</span>
            </li>
            <li className="rounded-xl border border-white/15 p-4">
              <span className="block text-3xl font-extrabold text-[var(--yplus-primary,#ead61f)]">
                12.7%
              </span>
              <span className="block">
                youth unemployment in Africa; many withdraw from the labour
                market.
              </span>
            </li>
            <li className="rounded-xl border border-white/15 p-4">
              <span className="block text-3xl font-extrabold text-[var(--yplus-primary,#ead61f)]">
                15 yrs
              </span>
              <span className="block">
                of progress in reducing youth NEET rates was reversed by
                COVID-19.
              </span>
            </li>
          </ul>

          {/* <p className="mt-3 text-sm text-white/70">
            Source: Global Employment Trends for Youth 2022 – ILO.
          </p> */}
        </article>

        {/* Kenya */}
        <article className="mt-10">
          <h3 className="text-xl md:text-2xl font-semibold">
            <span className="text-[var(--yplus-primary,#ead61f)]">YOUTH UNEMPLOYMENT</span>: A KENYAN PERSPECTIVE
          </h3>
          <p className="mt-3 text-white/90 max-w-3xl">
            Kenya’s youth face high unemployment and a fast-growing pipeline of
            new entrants to the labour force.
          </p>

          <ul className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3 text-white/90">
            <li className="rounded-xl border border-white/15 p-4">
              <span className="block text-3xl font-extrabold text-[var(--yplus-primary,#ead61f)]">
                38.9%
              </span>
              <span className="block">
                of youth reported unemployed as at May 2020.
              </span>
            </li>
            <li className="rounded-xl border border-white/15 p-4">
              <span className="block text-3xl font-extrabold text-[var(--yplus-primary,#ead61f)]">
                20–24
              </span>
              <span className="block">
                age group is the worst hit by unemployment.
              </span>
            </li>
            <li className="rounded-xl border border-white/15 p-4">
              <span className="block text-3xl font-extrabold text-[var(--yplus-primary,#ead61f)]">
                48.2%
              </span>
              <span className="block">
                of the population was below 17 in 2020—signalling a wave of
                future job seekers.
              </span>
            </li>
            <li className="rounded-xl border border-white/15 p-4">
              <span className="block text-3xl font-extrabold text-[var(--yplus-primary,#ead61f)]">
                ~1M
              </span>
              <span className="block">
                working-age entrants expected between 2020 and 2029.
              </span>
            </li>
          </ul>

          {/* <p className="mt-3 text-sm text-white/70">
            Sources: 2019 Kenya Population & Housing Census; World Bank Kenya Economic Update (June 2021); KNBS Quarterly (Jan–Mar 2020).
          </p> */}
        </article>
      </div>
    </section>
  );
}
