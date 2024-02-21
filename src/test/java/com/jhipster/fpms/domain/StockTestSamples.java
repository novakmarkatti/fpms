package com.jhipster.fpms.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class StockTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Stock getStockSample1() {
        return new Stock().id(1L).symbol("symbol1").name("name1").quantity(1);
    }

    public static Stock getStockSample2() {
        return new Stock().id(2L).symbol("symbol2").name("name2").quantity(2);
    }

    public static Stock getStockRandomSampleGenerator() {
        return new Stock()
            .id(longCount.incrementAndGet())
            .symbol(UUID.randomUUID().toString())
            .name(UUID.randomUUID().toString())
            .quantity(intCount.incrementAndGet());
    }
}
