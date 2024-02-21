package com.jhipster.fpms.repository;

import com.jhipster.fpms.domain.Portfolio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Portfolio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {}
