package com.jhipster.fpms.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class PortfolioTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Portfolio getPortfolioSample1() {
        return new Portfolio().id(1L).userName("userName1").emailAddress("emailAddress1");
    }

    public static Portfolio getPortfolioSample2() {
        return new Portfolio().id(2L).userName("userName2").emailAddress("emailAddress2");
    }

    public static Portfolio getPortfolioRandomSampleGenerator() {
        return new Portfolio()
            .id(longCount.incrementAndGet())
            .userName(UUID.randomUUID().toString())
            .emailAddress(UUID.randomUUID().toString());
    }
}
