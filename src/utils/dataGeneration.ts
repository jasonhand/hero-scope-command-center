
// Utility functions for generating synthetic city metrics and alerts

export const generateCityMetrics = (heroes: any[]) => {
  const metrics = [
    {
      id: 'crime-rate',
      name: 'Crime Rate',
      type: 'crime',
      unit: 'incidents/hour',
      severity: 'medium',
      trend: 'up',
      currentValue: 45,
      change: '+12%',
      baseline: 38,
      peak: 67,
      variance: '±8.2',
      dataPoints: 24,
      anomaly: Math.random() > 0.6,
      data: generateTimeSeriesData(24, 30, 60, Math.random() > 0.6),
      correlatedHeroes: heroes.slice(0, 3).map(h => h.name),
      pattern: 'Evening spike pattern',
      confidence: '89%',
      analysis: 'Unusual spike correlates with reduced police patrol density in sector 7.'
    },
    {
      id: 'power-grid',
      name: 'Power Grid Fluctuations',
      type: 'power',
      unit: 'MW variance',
      severity: 'high',
      trend: 'up',
      currentValue: 127,
      change: '+24%',
      baseline: 102,
      peak: 145,
      variance: '±15.3',
      dataPoints: 24,
      anomaly: Math.random() > 0.4,
      data: generateTimeSeriesData(24, 80, 150, Math.random() > 0.4),
      correlatedHeroes: heroes.filter(h => h.powerstats?.strength > 70).slice(0, 2).map(h => h.name),
      pattern: 'Harmonic distortion',
      confidence: '94%',
      analysis: 'Power surges match deployment times of strength-based heroes.'
    },
    {
      id: 'seismic-activity',
      name: 'Seismic Activity',
      type: 'seismic',
      unit: 'micro-tremors',
      severity: 'low',
      trend: 'down',
      currentValue: 23,
      change: '-5%',
      baseline: 24,
      peak: 41,
      variance: '±3.7',
      dataPoints: 24,
      anomaly: Math.random() > 0.8,
      data: generateTimeSeriesData(24, 15, 45, Math.random() > 0.8),
      correlatedHeroes: heroes.filter(h => h.powerstats?.strength > 80).slice(0, 2).map(h => h.name),
      pattern: 'Subsonic resonance',
      confidence: '76%',
      analysis: 'Minor tremors detected in industrial district. Possible underground activity.'
    },
    {
      id: 'communication',
      name: 'Communication Disruption',
      type: 'communication',
      unit: 'interference %',
      severity: 'medium',
      trend: 'up',
      currentValue: 31,
      change: '+18%',
      baseline: 26,
      peak: 52,
      variance: '±7.1',
      dataPoints: 24,
      anomaly: Math.random() > 0.5,
      data: generateTimeSeriesData(24, 20, 55, Math.random() > 0.5),
      correlatedHeroes: heroes.filter(h => h.powerstats?.intelligence > 75).slice(0, 2).map(h => h.name),
      pattern: 'Electromagnetic anomaly',
      confidence: '82%',
      analysis: 'Radio interference patterns suggest psychic or electromagnetic manipulation.'
    },
    {
      id: 'emergency-response',
      name: 'Emergency Response Time',
      type: 'emergency',
      unit: 'minutes',
      severity: 'high',
      trend: 'up',
      currentValue: 8.7,
      change: '+21%',
      baseline: 7.2,
      peak: 12.1,
      variance: '±1.4',
      dataPoints: 24,
      anomaly: Math.random() > 0.3,
      data: generateTimeSeriesData(24, 6, 14, Math.random() > 0.3),
      correlatedHeroes: heroes.filter(h => h.powerstats?.speed > 60).slice(0, 3).map(h => h.name),
      pattern: 'Traffic congestion',
      confidence: '91%',
      analysis: 'Delayed response times in sectors 3 and 5. Traffic anomalies detected.'
    },
    {
      id: 'citizen-stress',
      name: 'Citizen Stress Index',
      type: 'social',
      unit: 'stress level',
      severity: 'critical',
      trend: 'up',
      currentValue: 78,
      change: '+31%',
      baseline: 59,
      peak: 85,
      variance: '±12.8',
      dataPoints: 24,
      anomaly: Math.random() > 0.2,
      data: generateTimeSeriesData(24, 50, 90, Math.random() > 0.2),
      correlatedHeroes: heroes.slice(0, 4).map(h => h.name),
      pattern: 'Social media sentiment',
      confidence: '96%',
      analysis: 'Elevated stress levels citywide. Social media chatter indicates widespread concern.'
    }
  ];

  return metrics;
};

export const generateTimeSeriesData = (
  points: number, 
  min: number, 
  max: number, 
  hasAnomaly: boolean = false
) => {
  const data = [];
  const anomalyPoint = hasAnomaly ? Math.floor(Math.random() * points) : -1;
  
  for (let i = 0; i < points; i++) {
    const baseValue = min + Math.random() * (max - min);
    const noise = (Math.random() - 0.5) * (max - min) * 0.1;
    let value = baseValue + noise;
    
    // Add trend
    value += (i / points) * (max - min) * 0.2;
    
    // Add anomaly
    let anomalyValue = null;
    if (i === anomalyPoint) {
      anomalyValue = value * (1.5 + Math.random() * 0.5);
    }
    
    data.push({
      time: i,
      value: Math.round(value * 10) / 10,
      anomaly: anomalyValue
    });
  }
  
  return data;
};

export const generateAlerts = (metrics: any[]) => {
  const alerts = [];
  const alertTypes = ['threat', 'anomaly', 'deployment', 'system', 'trend'];
  const locations = ['Downtown', 'Harbor District', 'Tech Quarter', 'Industrial Zone', 'Residential Area'];
  
  // Generate alerts based on metrics
  metrics.forEach((metric, index) => {
    if (metric.anomaly || metric.severity === 'high' || metric.severity === 'critical') {
      alerts.push({
        id: `alert-${index}`,
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        severity: metric.severity,
        title: `${metric.name} Anomaly Detected`,
        description: `Unusual pattern in ${metric.name.toLowerCase()} requires investigation`,
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        location: locations[Math.floor(Math.random() * locations.length)],
        acknowledged: Math.random() > 0.7,
        metricId: metric.id
      });
    }
  });
  
  // Add some system alerts
  const systemAlerts = [
    {
      id: 'system-1',
      type: 'system',
      severity: 'low',
      title: 'Hero Roster Updated',
      description: 'New heroes added to available roster',
      timestamp: new Date(Date.now() - Math.random() * 1800000).toISOString(),
      acknowledged: true
    },
    {
      id: 'system-2',
      type: 'deployment',
      severity: 'medium',
      title: 'Hero Deployment Complete',
      description: 'All assigned heroes have reached their target zones',
      timestamp: new Date(Date.now() - Math.random() * 900000).toISOString(),
      acknowledged: false
    }
  ];
  
  return [...alerts, ...systemAlerts].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};
